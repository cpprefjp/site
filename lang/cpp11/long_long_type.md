# long long型
* cpp11[meta cpp]

## 概要
C99互換として、`long long`整数型が追加された。

この整数型は、64ビット以上の値を表現できる。


## 仕様
- `long long`型および`unsigned long long`型は、64ビット以上の値を表現できることが保証される。
    - これは、`long long`型の最大値を表現するマク�[`LLONG_MAX`](/reference/climits/llong_max.md)、および`unsigned long long`型の最大値を表現するマク�[`ULLONG_MAX`](/reference/climits/ullong_max.md)によって定義されている。
- 符号付き整数型である`long long`を表す整数リテラルには、`ll`もしくは`LL`サフィックスを使用する。符号なし整数型である`unsigned long long`型を表す整数リテラルには、`ull`もしくは`ULL`サフィックスを使用する。
    - 符号指定を除く`ll`と`LL`の部分では、大文�と小文�の混在は許可しない。(`lL`や`Ll`は許可されないが、'uLL'や'Ull'は問題ない。)
- `long long`は、以下のようにも表記できる：
    - `signed long long`
    - `signed long long int`
    - `long long int`
- `unsigned long long`は、`unsigned long long int`のようにも表記できる。


## 備考
`long long`型の追加にともなって、ライブラリにも以下のような変更が入った：

- [`fprintf()`](/reference/cstdio/fprintf.md.nolink)と[`fscanf()`](/reference/cstdio/fscanf.md.nolink)およびそのフォーマットを使用する関数に、`long long`を表す`ll`が表現幅を指示するために追加された。
- `#if`および`#elif`に指定する定数条件式の評価について、「`(unsigned) int`は`(unsigned) long`と同じ表現（範囲）を持つように振舞う」とされていたのが、「全ての符号付きまたは符号無し整数型はそれぞれ[`intmax_t`](/reference/cstdint/intmax_t.md)または[`uintmax_t`](/reference/cstdint/uintmax_t.md)の表現（範囲）を持つように振舞う」と変更された。
- その他、入出力や数�の関数にも、`long long`型のサポートが追加された。

`long long`は64ビット以上の幅であることが保証されるが、64ビット固定の整数型が必要な場合には、[`int64_t`](/reference/cstdint/int64_t.md)型を使用することを推奨する。たとえばシリアライズの際には、ビット幅が固定の整数型を使用すれば、異なるプラットフォームでもデシリアライズできる。


## 例
```cpp example
#include <iostream>

int main()
{
  long long x = 123LL;
  std::cout << x << std::endl;
}
```

### 出力
```
123
```

## この機能が必要になった背景・経緯
この型は、64ビットCPUにおいて64ビット幅の整数型を表現するために用意された。

`long long`のように、`long`を2つ連続させることで「`long`より大きな型」であることを表現するのは非常に醜いものではあるが、C99およびコンパイラの実装による事実上の標準があったために、C++もそれにならった。ただし、これは128ビット整数型に対応する際に`long long long`型を定義することは意味しない。その際は、改めて型の定義を�論する必要があるが、いまは`long long`で64ビット整数型を表現することとした。


## 関連項目
- [`LLONG_MIN`](/reference/climits/llong_min.md)
- [`LLONG_MAX`](/reference/climits/llong_max.md)
- [`ULLONG_MAX`](/reference/climits/ullong_max.md)
- [`int64_t`](/reference/cstdint/int64_t.md)
- [`int_fast64_t`](/reference/cstdint/int_fast64_t.md)
- [`int_least64_t`](/reference/cstdint/int_least64_t.md)
- [`uint64_t`](/reference/cstdint/uint64_t.md)
- [`uint_fast64_t`](/reference/cstdint/uint_fast64_t.md)
- [`uint_least64_t`](/reference/cstdint/uint_least64_t.md)


## 参照
- [N0715 Incorporate the `long long` integral data type in C++](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/1995/N0715.ps)
- [N1565 Adding the `long long` type to C++](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2004/n1565.pdf)

