# wcrtomb
* cwchar[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  size_t wcrtomb(char* s, wchar_t wc, mbstate_t* ps);
}
```
* size_t[link /reference/cstddef/size_t.md]
* mbstate_t[link mbstate_t.md]

## 概要
ワイド文字を、変換状態を保持しながらマルチバイト文字へ変換する。


## 効果
`wc`をマルチバイト文字へ変換し、`s`が指す配列へ書き込む。書き込まれるバイト数は最大で`MB_CUR_MAX`である。


## 戻り値
書き込んだバイト数を返す。`wc`が有効なワイド文字ではない場合、`(size_t)-1`を返し、[`errno`](/reference/cerrno/errno.md)に`EILSEQ`を設定する。


## 備考
- `s`がヌルポインタの場合、内部のバッファに対してヌルワイド文字を変換したものとして扱われる
- 書き込み先の配列は、`MB_CUR_MAX`バイト以上の大きさをもたなければならない


## 例
```cpp example
#include <cwchar>
#include <clocale>
#include <cstdlib>
#include <iostream>

int main()
{
  std::setlocale(LC_ALL, "C.UTF-8");

  std::mbstate_t state{};
  char buffer[MB_CUR_MAX];

  // UTF-8では3バイトへ変換される
  std::size_t n = std::wcrtomb(buffer, L'あ', &state);
  std::wcout << n << std::endl;
}
```
* std::wcrtomb[color ff0000]
* std::wcout[link /reference/iostream/wcout.md]

### 出力例
```
3
```


## バージョン
### 言語
- C++98


## 関連項目
- [`mbrtowc`](mbrtowc.md): 逆方向の変換
- [`wcsrtombs`](wcsrtombs.md): 文字列全体を変換する
- [`MB_CUR_MAX`](/reference/cstdlib/mb_cur_max.md)
