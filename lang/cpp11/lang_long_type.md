#long long型
* cpp11[meta cpp]

##概要
C99互換として、`long long`整数型が追加された。

この整数型は、64ビット以上の値を表現できる。


##仕様
- `long long`型および`unsigned long long`型は、64ビット以上の値を表現できることが保証される。
    - これは、`long long`型の最大値を表現するマクロ[`LLONG_MAX`](/reference/climits/llong_max.md)、および`unsigned long long`型の最大値を表現するマクロ[`ULLONG_MAX`](/reference/climits/ullong_max.md)によって定義されている。
- 符号あり整数型である`long long`を表す整数リテラルには、`ll`もしくは`LL`サフィックスを使用する。符号なし整数型である`unsigned long long`型を表す整数リテラルには、`ull`もしくは`ULL`サフィックスを使用する。
    - 大文字と小文字の混在は許可しない。(`lL`や`Ll`は許可されない。これには`U`サフィックスも含まれる)
- `long long`は、以下のようにも表記できる：
    - `signed long long`
    - `signed long long int`
    - `long long int`
- `unsigned long long`は、`unsigned long long int`のようにも表記できる。


##備考
`long long`型の追加にともなって、ライブラリにも以下のような変更が入った：

- [`fprintf()`](/reference/cstdio/fprintf.md.nolink)と[`fscanf()`](/reference/cstdio/fscanf.md.nolink)およびそのフォーマットを使用する関数に、`long long`を表す`ll`が表現幅を指示するために追加された。
- 最大の整数型を表す[`intmax_t`](/reference/cstdint/intmax_t.md)が`long long`の別名になり、[`uintmax_t`](/reference/cstdint/uintmax_t.md)が`unsigned long long`の別名になった。
- その他、入出力や数学の関数にも、`long long`型のサポートが追加された。


##例
```cpp
#include <iostream>

int main()
{
  long long x = 123LL;
  std::cout << x << std::endl;
}
```
* std::cout[link /reference/iostream/cout.md]
* std::endl[link /reference/ostream/endl.md]

###出力
```
123
```

##この機能が必要になった背景・経緯
この型は、64ビットCPUにおいて64ビット幅の整数型を表現するために用意された。

`long long`のように、`long`を2つ連続させることで「`long`より大きな型」であることを表現するのは非常に醜いものではあるが、C99およびコンパイラの実装による事実上の標準があったために、C++もそれにならった。ただし、これは128ビット整数型に対応する際に`long long long`型を定義することは意味しない。その際は、改めて型の定義を議論する必要があるが、いまは`long long`で64ビット整数型を表現することとした。


##関連項目
- [`LLONG_MIN`](/reference/climits/llong_min.md)
- [`LLONG_MAX`](/reference/climits/llong_max.md)
- [`ULLONG_MAX`](/reference/climits/ullong_max.md)


##参照
- [N0715 Incorporate the `long long` integral data type in C++](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/1995/N0715.ps)
- [N1565 Adding the `long long` type to C++](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2004/n1565.pdf)

