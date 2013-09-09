# Quick and dirty script to read unique IDs from NFC tags using the ACR122U USB
# reader.
#
# PC/SC-based API details for the ACR122U available at
# http://acs.com.hk/drivers/eng/API_ACR122U_v2.01.pdf
#
# Assumes ruby >= 1.9.2
# `gem install smartcard` first
#

require 'smartcard'
require 'net/http'

meteor_root = 'http://matrix.thedreamfactory.net'
url_nfc_insert  = meteor_root + '/nfcinsert'
url_nfc_removed = meteor_root + '/nfcremoved'

context = Smartcard::PCSC::Context.new
reader = context.readers.first   # Assuming only one reader attached

queries = Smartcard::PCSC::ReaderStateQueries.new(1)
queries[0].current_state = :empty
queries[0].reader_name = context.readers.first

puts "Calibration Time!"
puts
puts "Place and leave a tag on the device"

context.wait_for_status_change(queries)
queries.ack_changes

puts "Great... Hold on a sec..."
card = context.card(reader, :shared)

# Disable the standard buzzer when a tag is detected (Section 6.7). It sounds
# immediately after placing a tag resulting in people lifting the tag off before
# we've had a chance to read the ID.
card.transmit "\xFF\x00\x52\x00\x00"

puts "Okay. Remove the tag..."
context.wait_for_status_change(queries)
queries.ack_changes
puts "Thanks. We're all set now."

puts
puts "Listening for tags..."

loop do
  context.wait_for_status_change(queries)   # Wait for new tag
  queries.ack_changes

  begin
    card = context.card(reader, :shared)

    # Ask card for UID in APDU format (Section 5.1)
    response = card.transmit("\xFF\xCA\x00\x00\x04").unpack('C*')

    # Check last two bytes for success code
    if response.last(2) == [0x90, 00]
      # Nice hex string
      uid = response[0..-3].pack('C*').unpack('H*').first
      puts "TAG: #{uid}"
      # call our rest server and get prescence information
      resp = Net::HTTP.get_response(URI.parse(url_nfc_insert + '/' + uid))
      # Beep and change LED to orange to signal user we've read the tag.
      # (Section 6.2)
      if resp.body == "PRESENT"
          puts "PRESENT"
          # Green result
          card.transmit "\xFF\x00\x40\xCE\x04\x03\x00\x01\x01" rescue nil
      else
          puts "ABSENT"
          # Red result
          card.transmit "\xFF\x00\x40\xCD\x04\x03\x00\x01\x01" rescue nil
      end 
    else
      puts 'ERROR: tag error when reading UID'
    end

  rescue Smartcard::PCSC::Exception => ex
    puts "ERROR: #{ex.pcsc_status}"
  end

  context.wait_for_status_change(queries)   # Wait for tag to be removed
  queries.ack_changes
end
