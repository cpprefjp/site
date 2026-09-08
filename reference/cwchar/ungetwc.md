# ungetwc
* cwchar[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  wint_t ungetwc(wint_t c, FILE* stream);
}
```
* FILE[link /reference/cstdio/file.md]
* wint_t[link wint_t.md]

## 概要
入力ストリームに1文字戻す。


## 戻り値
戻した文字を返す。戻せなかった場合は`WEOF`を返す。


## 備考
- 戻せる文字数は1文字だけが保証される
- `c`が`WEOF`である場合はなにも行わず、`WEOF`を返す
- [`fseek()`](/reference/cstdio/fseek.md)などでファイル位置を変更すると、戻した文字は破棄される


## 例
```cpp example
#include <cwchar>
#include <cstdio>
#include <iostream>

int main()
{
  std::FILE* fp = std::fopen("test.txt", "w+");
  std::fputws(L"abc", fp);
  std::rewind(fp);

  std::wint_t c = std::fgetwc(fp);
  std::ungetwc(c, fp);

  // 戻した文字が再び読み込まれる
  std::wcout << (std::fgetwc(fp) == c) << std::endl;

  std::fclose(fp);
}
```
* std::ungetwc[color ff0000]
* std::wcout[link /reference/iostream/wcout.md]

### 出力
```
1
```


## バージョン
### 言語
- C++98


## 関連項目
- [`fgetwc`](fgetwc.md)
- [`std::ungetc()`](/reference/cstdio/ungetc.md): マルチバイト文字列版
