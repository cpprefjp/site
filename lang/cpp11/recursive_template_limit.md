# テンプレート再帰回数の制限緩和
* cpp11[meta cpp]

<!-- start lang caution -->

このページはC++11に採用された言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative-page)を参照してください。

<!-- last lang caution -->

## 概要
C++03まで、テンプレートの再帰回数は、「17回以上であることを実装に推奨する」というものであった。

C++11からはこれが、1024回に緩和された。


## 備考
コンパイラによっては、コンパイルオプションでテンプレート再帰回数の上限を設定できる。

GCCとClangでは、`-ftemplate-depth`オプションで設定できる：

```
g++ main.cpp -ftemplate-depth=1024
```

ここの`1024`を任意の値に変更することで、再帰回数の上限を設定できる。

GCC 5.2時点で、デフォルトは900回。

Clang 3.7時点で、デフォルトは256回。


## 例
```cpp example
// 再帰回数の上限を確認する用のコード。
// 範囲[1, N]の総和を求めるメタ関数sigma_nを定義している。
//
// sigma_nメタ関数に与えるテンプレート引数を、
// 任意の値に変更して再帰回数の上限を確認してください。
#include <iostream>

template <int N>
struct sigma_n {
  static constexpr int value = N + sigma_n<N - 1>::value;
};

template <>
struct sigma_n<0> {
  static constexpr int value = 0;
};

int main()
{
  std::cout << sigma_n<10>::value << std::endl;
}
```

### 出力
```
55
```


## 参照
- [CWG Issue 831. Limit on recursively nested template instantiations](http://www.open-std.org/jtc1/sc22/wg21/docs/cwg_defects.html#831)
- [Variadic Templates for C++0x](https://web.archive.org/web/20230430062038/http://www.jot.fm/issues/issue_2008_02/article2/)
    - テンプレートの再帰によって、コンパイル時間がどれくらい延びるかのレポートがある記事
- [C++ Language Features/Controlling implementation limits - Clang Compiler User’s Manual](http://clang.llvm.org/docs/UsersManual.html#cmdoption-ftemplate-depth)
- [3.5 Options Controlling C++ Dialect - GCC Command Options](https://gcc.gnu.org/onlinedocs/gcc/C_002b_002b-Dialect-Options.html)
