# is_constant_evaluated
* type_traits[meta header]
* function[meta id-type]
* std[meta namespace]
* cpp20[meta cpp]

```cpp
namespace std {
  constexpr bool is_constant_evaluated() noexcept;
}
```

## 概要
呼び出された時、その呼び出しが定数式評価の中で行われているかを判定する。

この関数は、コンパイル時と実行時で実装を切り替える用途に使用できる。


## 戻り値
- C++20:
    本関数は以下の文脈内で評価された場合に`true`を返す。

    - 文法上の定数式（配列型の要素数、`case`ラベルの値、など）
    - [`constexpr if`](/lang/cpp17/if_constexpr.md)の条件式
    - [`consteval`関数](/lang/cpp20/immediate_functions.md)の呼び出し内
    - [コンセプト](/lang/cpp20/concepts.md)の定義式
        - `requires`節内
        - 入れ子要件内
    - 定数式で使用可能な変数の初期化式
        - `constexpr`変数の初期化式
        - 定数初期化される`const`な整数、列挙型変数の初期化式
        - 定数初期化される参照型変数の初期化式
    - 定数初期化される変数の初期化式

    上記の文脈の外では、コンパイラの最適化（定数畳み込み）によって容易にコンパイル時評価できる式や`constexpr`関数の呼び出し中の評価であっても`false`となる。

    [`constexpr if`](/lang/cpp17/if_constexpr.md)の条件式および[`static_assert`](/lang/cpp11/static_assert.md)の条件式に書かれている場合は必ず`true`となるので注意が必要である。

- C++23:
    以下と等価：
    ```cpp
    if consteval {
      return true;
    } else {
      return false;
    }
    ```

## 備考

変数の初期化式内でこの関数を利用すると、その初期化式が定数式となるかどうかによって複数回呼び出される事がある。

```cpp
int y;  //constでもconstexprでもなく未初期化の変数、定数式で利用できない

const int a = std::is_constant_evaluated() ? y : 1; //aは実行時に1で初期化される
//コンパイル時に一度呼ばれ、その時はtrueを返すが
//定数式で利用出来ない変数yを用いて初期化しようとするためコンパイル時実行不可
//そのため、実行時にもう一度呼ばれ`false`を返す。

double array1[a];  //変数aは定数式で使用できないためコンパイルエラー

const int b = std::is_constant_evaluated() ? 2 : y; //bはコンパイル時に2で初期化される
//コンパイル時に一度だけ呼ばれ、trueを返す
//定数値2で初期化する式になり、定数式として実行される。

double array2[b];  //ok

int c = y + (std::is_constant_evaluated() ? 2 : y); //cは実行時にy+yで初期化される（yの初期化がされない場合未定義動作）
//初期化式にまず定数式で利用出来ない変数yが出現するため、コンパイル時実行不可
//is_constant_evaluated()は実行時に呼び出されfalseを返す
//オペランドの評価順序によっては、コンパイル時にも1度呼ばれるかもしれない
```

この様な挙動に依存したプログラムにならない様に注意が必要である。

## 例
```cpp example
#include <type_traits>
#include <cmath>
#include <numbers>
#include <iostream>
#include <iomanip>
#include <limits>

//コンパイル時と実行時の、どちらでも呼び出せるsin関数
template<typename T>
constexpr auto my_sin(T theta) -> T {
  if (std::is_constant_evaluated()) {
    //コンパイル時に評価される文脈
    auto fabs = [](T v) -> T { return (v < T(0.0))?(-v):(v); };
    T x_sq = -(theta * theta);
    T series = theta;
    T tmp = theta;
    T fact = T(2.0);

    //マクローリン級数の計算
    do {
      tmp *= x_sq / (fact * (fact+T(1.0)));
      series += tmp;
      fact += T(2.0);
    } while(fabs(tmp) >= std::numeric_limits<T>::epsilon());

    return series;
  } else {
    //実行時に評価される文脈
    return std::sin(theta);
  }
}

int main()
{
  constexpr auto sin_static = my_sin(std::numbers::pi/3.0); //コンパイル時計算

  double arg = std::numbers::pi/3.0;
  auto sin_dynamic = my_sin(arg);  //実行時計算

  std::cout << std::setprecision(16);
  std::cout << sin_static << std::endl;
  std::cout << sin_dynamic << std::endl;
  std::cout << my_sin(std::numbers::pi/3.0) << std::endl; //実行時計算
}
```
* is_constant_evaluated[color ff0000]
* epsilon()[link /reference/limits/numeric_limits/epsilon.md]
* std::numbers::pi[link /reference/numbers/pi.md]

### 出力
```
0.8660254037844385
0.8660254037844386
0.8660254037844386
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 9
- [GCC](/implementation.md#gcc): 9.1
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2019 update5

## 関連項目
- [C++20 コンパイル時初期化を強制する`constinit`キーワードを追加](/lang/cpp20/constinit.md)
- [C++23 `if consteval`](/lang/cpp23/if_consteval.md)

## 参照
- [P0595R2 `std::is_constant_evaluated()`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0595r2.html)
- [P1938R3 `if consteval`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p1938r3.html)
    - C++23で`if consteval`を導入したことにより、この関数の効果を`if consteval`ベースの仕様に変更
