# mbsrtowcs
* cwchar[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  size_t mbsrtowcs(wchar_t* dst, const char** src, size_t len, mbstate_t* ps);
}
```
* size_t[link /reference/cstddef/size_t.md]
* mbstate_t[link mbstate_t.md]

## 概要
マルチバイト文字列を、ワイド文字列へ変換する。


## 効果
`*src`が指す文字列を変換し、`dst`が指す配列へ最大`len`文字を書き込む。変換が途中で止まった場合、`*src`は次に変換すべき位置を指すように更新される。すべて変換できた場合、`*src`にはヌルポインタが設定される。


## 戻り値
書き込んだ文字数（終端のヌル文字を含まない）を返す。不正なバイト列があった場合は`(size_t)-1`を返し、[`errno`](/reference/cerrno/errno.md)に`EILSEQ`を設定する。


## 備考
- `dst`がヌルポインタの場合、書き込みは行われず、変換に必要な文字数だけが返る


## 例
```cpp example
#include <cwchar>
#include <clocale>
#include <iostream>

int main()
{
  std::setlocale(LC_ALL, "C.UTF-8");

  std::mbstate_t state{};
  const char* src = "abc";
  wchar_t buffer[8] = {};

  std::size_t n = std::mbsrtowcs(buffer, &src, 8, &state);
  std::wcout << n << std::endl;
  std::wcout << buffer << std::endl;
}
```
* std::mbsrtowcs[color ff0000]
* std::wcout[link /reference/iostream/wcout.md]
* LC_ALL[link /reference/clocale/lc_all.md]
* std::setlocale[link /reference/clocale/setlocale.md]

### 出力例
```
3
abc
```


## バージョン
### 言語
- C++98


## 関連項目
- [`wcsrtombs`](wcsrtombs.md): 逆方向の変換
- [`mbrtowc`](mbrtowc.md): 1文字ずつ変換する
- [`std::mbstowcs()`](/reference/cstdlib/mbstowcs.md): 変換状態を引数で受け取らない、内部状態に依存するバージョン
