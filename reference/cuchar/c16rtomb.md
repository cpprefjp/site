# c16rtomb
* cuchar[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  size_t c16rtomb(char* s, char16_t c16, mbstate_t* ps);
}
```
* size_t[link /reference/cstddef/size_t.md]
* mbstate_t[link /reference/cwchar/mbstate_t.md]

## 概要
UTF-16文字 (`char16_t`) を、マルチバイト文字へ変換する。

`c16`をマルチバイト文字へ変換し、`s`が指す配列へ書き込む。書き込まれるバイト数は最大で[`MB_CUR_MAX`](/reference/cstdlib/mb_cur_max.md)である。変換状態は`ps`が指すオブジェクトに保持されるため、複数のスレッドから安全に使用できる。

サロゲートペアの上位サロゲートを渡した場合、そのコード単位だけでは文字が確定しないため、なにも書き込まれず`0`が返る。続けて下位サロゲートを渡すと、両者を組み合わせた文字がマルチバイト文字へ変換される。

`s`がヌルポインタの場合、`c16rtomb(buf, u'\0', ps)`の呼び出しと等価であり（`buf`は内部のバッファ）、変換状態を初期状態に戻す動作となる。


## 戻り値
- 書き込んだバイト数を返す
- 上位サロゲートのみを渡すなど、文字が確定しない場合は`0`を返す
- `c16`が有効な文字ではない場合、`(size_t)-1`を返し、[`errno`](/reference/cerrno/errno.md)に`EILSEQ`を設定する


## 備考
- `ps`がヌルポインタの場合、処理系が用意した内部のオブジェクトが変換状態として使用される
- 書き込み先の配列は、[`MB_CUR_MAX`](/reference/cstdlib/mb_cur_max.md)バイト以上の大きさをもたなければならない
- マルチバイト文字への変換は、現在のロケールカテゴリ[`LC_CTYPE`](/reference/clocale/lc_ctype.md)に依存する


## 例
### 基本的な使い方
```cpp example
#include <cuchar>
#include <clocale>
#include <cstdlib>
#include <cstdio>

int main()
{
  std::setlocale(LC_ALL, "C.UTF-8");

  char buffer[MB_CUR_MAX];
  std::mbstate_t state{};

  // 'あ' はUTF-8では3バイトへ変換される
  std::size_t n = std::c16rtomb(buffer, 0x3042, &state);

  std::printf("%zu\n", n);
}
```
* std::c16rtomb[color ff0000]
* std::mbstate_t[link /reference/cwchar/mbstate_t.md]
* MB_CUR_MAX[link /reference/cstdlib/mb_cur_max.md]
* LC_ALL[link /reference/clocale/lc_all.md]
* std::setlocale[link /reference/clocale/setlocale.md]

#### 出力例
```
3
```


### サロゲートペアを変換する
```cpp example
#include <cuchar>
#include <clocale>
#include <cstdlib>
#include <cstdio>

int main()
{
  std::setlocale(LC_ALL, "C.UTF-8");

  char buffer[MB_CUR_MAX];
  std::mbstate_t state{};

  // 上位サロゲートだけでは文字が確定しないため、なにも書き込まれず0が返る
  std::size_t n1 = std::c16rtomb(buffer, 0xD83D, &state);

  // 下位サロゲートを渡すと、😀 (U+1F600) がUTF-8の4バイトへ変換される
  std::size_t n2 = std::c16rtomb(buffer, 0xDE00, &state);

  std::printf("%zu %zu\n", n1, n2);
}
```
* std::c16rtomb[color ff0000]
* std::mbstate_t[link /reference/cwchar/mbstate_t.md]
* MB_CUR_MAX[link /reference/cstdlib/mb_cur_max.md]
* LC_ALL[link /reference/clocale/lc_all.md]
* std::setlocale[link /reference/clocale/setlocale.md]

#### 出力例
```
0 4
```


## バージョン
### 言語
- C++11


## 関連項目
- [`mbrtoc16`](mbrtoc16.md): 逆方向の変換
- [`c32rtomb`](c32rtomb.md)
- [`c8rtomb`](c8rtomb.md): UTF-8文字からの変換
- [`std::wcrtomb()`](/reference/cwchar/wcrtomb.md): ワイド文字からの変換


## 参照
- [P0175R1 Synopses for the C library](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0175r1.html)
