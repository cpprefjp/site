# クラステンプレートのテンプレート引数推論
* cpp17[meta cpp]

## 概要
コンストラクタに渡される値によって、クラステンプレートのテンプレート引数を推論する。

```cpp
// std::vectorクラステンプレートのテンプレート引数を省略。
// 初期化時に代入される初期化子リストの要素型が、std::vectorの要素型となる
std::vector v = {1, 2, 3}; // 変数vの型はstd::vector<int>
```

単純なケースでは、コンストラクタで受け取る値の型がクラスのテンプレートパラメータである場合に、クラスのテンプレート引数が推論される。

```cpp
template <class T>
struct Point {
  T x, y;

  // コンストラクタは、クラスのテンプレートパラメータT型のパラメータをとる
  Point(T x_, T y_)
    : x(x_), y(y_) {}
};

int main()
{
  Point p {1.0f, 3.0f}; // 変数pの型はPoint<float>に推論される
  Point q {1.0, 3.0};   // 変数qの型はPoint<double>に推論される
}
```

より複雑な例として、コンストラクタがクラスのテンプレートパラメータ型の値を直接受け取らない場合は、「推論補助宣言 (deduction guide declaration)」をクラス外に記述する。

```cpp
#include <iostream>
#include <vector>
#include <list>
#include <iterator>

namespace mine {

// std::vectorをラップした可変長配列クラス
template <class T>
class MyVector {
  std::vector<T> data_;

public:
  // コンストラクタではクラステンプレートパラメータTを直接使用せず、
  // イテレータ範囲で初期化する
  template <class InputIterator>
  MyVector(InputIterator first, InputIterator last)
    : data_(first, last) {}

  void print()
  {
    for (const T& x : data_) {
      std::cout << x << std::endl;
    }
  }
};

// 推論補助宣言。クラスが所属する名前空間の、クラス外に記述する。
// イテレータの要素型をMyVectorのテンプレート引数として使用する。
template <class InputIterator>
MyVector(InputIterator, InputIterator)
  -> MyVector<typename std::iterator_traits<InputIterator>::value_type>;

} // namespace mine

int main()
{
  std::list ls = {1, 2, 3};

  // 変数vの型はmine::MyVector<int>に推論される
  mine::MyVector v {ls.begin(), ls.end()};

  v.print();// 1, 2, 3が順に出力される
}
```
* std::iterator_traits[link /reference/iterator/iterator_traits.md]

コンストラクタのパラメータ型から、直接あるいは間接的にクラステンプレートの引数を求められない場合は、推論できない。


## 仕様
(作業中)

## 例
```cpp
```

### 出力
```
```


## 参照
- [P0091R3 Template argument deduction for class templates (Rev. 6)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0091r3.html)
