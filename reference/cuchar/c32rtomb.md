# c32rtomb
* cuchar[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  size_t c32rtomb(char* s, char32_t c32, mbstate_t* ps);
}
```
* size_t[link /reference/cstddef/size_t.md]
* mbstate_t[link /reference/cwchar/mbstate_t.md]

## 概要
UTF-32文字 (`char32_t`) を、マルチバイト文字へ変換する。

`c32`をマルチバイト文字へ変換し、`s`が指す配列へ書き込む。書き込まれるバイト数は最大で[`MB_CUR_MAX`](/reference/cstdlib/mb_cur_max.md)である。変換状態は`ps`が指すオブジェクトに保持されるため、複数のスレッドから安全に使用できる。

`s`がヌルポインタの場合、`c32rtomb(buf, uU'\0', ps)`の呼び出しと等価であり（`buf`は内部のバッファ）、変換状態を初期状態に戻す動作となる。


## 戻り値
- 書き込んだバイト数を返す
- 上位サロゲートのみを渡すなど、文字が確定しない場合は`0`を返す
- `c32`が有効な文字ではない場合、`(size_t)-1`を返し、[`errno`](/reference/cerrno/errno.md)に`EILSEQ`を設定する


## 備考
- `ps`がヌルポインタの場合、処理系が用意した内部のオブジェクトが変換状態として使用される
- 書き込み先の配列は、[`MB_CUR_MAX`](/reference/cstdlib/mb_cur_max.md)バイト以上の大きさをもたなければならない
- マルチバイト文字への変換は、現在のロケールカテゴリ[`LC_CTYPE`](/reference/clocale/lc_ctype.md)に依存する


## 例
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
  std::size_t n = std::c32rtomb(buffer, U'あ', &state);

  std::printf("%zu\n", n);
}
```
* std::c32rtomb[color ff0000]
* std::mbstate_t[link /reference/cwchar/mbstate_t.md]
* MB_CUR_MAX[link /reference/cstdlib/mb_cur_max.md]
* LC_ALL[link /reference/clocale/lc_all.md]
* std::setlocale[link /reference/clocale/setlocale.md]

### 出力例
```
3
```



## バージョン
### 言語
- C++11


## 関連項目
- [`mbrtoc32`](mbrtoc32.md): 逆方向の変換
- [`c16rtomb`](c16rtomb.md)
- [`c8rtomb`](c8rtomb.md): UTF-8文字からの変換
- [`std::wcrtomb()`](/reference/cwchar/wcrtomb.md): ワイド文字からの変換


## 参照
- [P0175R1 Synopses for the C library](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0175r1.html)
