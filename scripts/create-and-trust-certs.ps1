Read-Host 'This will erase your existing certificates in .\keys and creates new ones. Requires Administrator prompt. Continue?'

cd .\keys

# Create new cert
& 'C:\Program Files (x86)\Windows Kits\10\bin\x64\makecert.exe' /n "CN=1A1BED3A-A583-4770-8B49-66781F57030A" /r /h 0 /eku "1.3.6.1.5.5.7.3.3,1.3.6.1.4.1.311.10.3.13" /e 04/30/2019 /sv MyKey.pvk MyKey.cer

# Convert to correct format for SignTool
& 'C:\Program Files (x86)\Windows Kits\10\bin\x64\pvk2pfx.exe'/pvk MyKey.pvk /pi pvkPassword /spc MyKey.cer /pfx MyKey.pfx

# Add Cert to trusted people
Certutil -addStore TrustedPeople .\MyKey.cer