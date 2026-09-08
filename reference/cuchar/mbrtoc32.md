# mbrtoc32
* cuchar[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  size_t mbrtoc32(char32_t* pc32, const char* s, size_t n, mbstate_t* ps);
}
```
* size_t[link /reference/cstddef/size_t.md]
* mbstate_t[link /reference/cwchar/mbstate_t.md]

## 概要
マルチバイト文字を、UTF-32文字 (`char32_t`) に変換する。

`s`が指す位置から最大`n`バイトを読み込んで1文字分のマルチバイト文字を解析し、対応するUTF-32のコード単位を`pc32`が指す位置へ格納する。変換状態は`ps`が指すオブジェクトに保持されるため、複数のスレッドから安全に使用できる。

`char32_t`はすべてのUnicodeコードポイントを1つの値で表現できるため、[`mbrtoc16()`](mbrtoc16.md)と違ってサロゲートペアを扱う必要はない。

`s`がヌルポインタの場合、`mbrtoc32(nullptr, "", 1, ps)`の呼び出しと等価であり、変換状態を初期状態に戻す動作となる。


## 戻り値
| 戻り値 | 意味 |
|--------|------|
| `0` | ヌル文字へ変換された |
| 正の値（`n`以下） | 変換に使用したバイト数 |
| `(size_t)-1` | 不正なバイト列である。[`errno`](/reference/cerrno/errno.md)に`EILSEQ`が設定され、変換状態は未規定となる |
| `(size_t)-2` | 次の`n`バイトは不完全だが、不正ではない文字の一部である |
| `(size_t)-3` | 入力を消費せず、前回の呼び出しで解析した文字の続きのコード単位が格納された |


## 備考
- `ps`がヌルポインタの場合、処理系が用意した内部のオブジェクトが変換状態として使用される
- マルチバイト文字の解釈は、現在のロケールカテゴリ[`LC_CTYPE`](/reference/clocale/lc_ctype.md)に依存する


## 例
```cpp example
#include <cuchar>
#include <clocale>
#include <cstdio>

int main()
{
  std::setlocale(LC_ALL, "C.UTF-8");

  const char src[] = "あ";
  char32_t c = 0;
  std::mbstate_t state{};

  // UTF-8の3バイトを消費して1文字へ変換される
  std::size_t n = std::mbrtoc32(&c, src, sizeof(src), &state);
  std::printf("%zu %04X\n", n, (unsigned)c);
}
```
* std::mbrtoc32[color ff0000]
* std::mbstate_t[link /reference/cwchar/mbstate_t.md]
* LC_ALL[link /reference/clocale/lc_all.md]
* std::setlocale[link /reference/clocale/setlocale.md]

### 出力例
```
3 3042
```



## バージョン
### 言語
- C++11


## 関連項目
- [`c32rtomb`](c32rtomb.md): 逆方向の変換
- [`mbrtoc16`](mbrtoc16.md)
- [`mbrtoc8`](mbrtoc8.md): UTF-8文字への変換
- [`std::mbrtowc()`](/reference/cwchar/mbrtowc.md): ワイド文字への変換


## 参照
- [P0175R1 Synopses for the C library](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0175r1.html)
