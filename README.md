# CFO Emu Info

## Web site
- App: https://script.google.com/macros/s/AKfycbzik6l0pIdwiRJlssiCDhTQvCcmznuvcyxK1QKU_qYuH1t87NVO/exec
- DB: https://docs.google.com/spreadsheets/d/11hQvoBo8KAeXdrgCeESJEsJXyjHsevhPQUgL2P-FB2c/view

## Requirements
- Node (ver. 10 >)

## Usage

### Setup GAS

```
# create DB as Google spreadsheet and GAS

# install and setup clasp
sudo npm i @google/clasp -g
clasp login

# create `.clasp.json`
cat <<EOS > .clasp.json
{
    "scriptId":"<Google spreadsheet DB ID>",
    "rootDir": "dist/"
}
EOS
```

### Build

```
npm run build
```

### Deploy

```
clasp deploy
```

### Others
See `package.json` and [Clasp documents](https://github.com/google/clasp).
