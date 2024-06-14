# 定数式からの仮想関数の呼び出しを許可 [P1064R0]
* cpp20[meta cpp]

## 概要
C++20では、仮想関数に対して`constexpr`を指定し、定数式の文脈で呼び出せるようになる。

非`constexpr`な仮想関数を`constexpr`仮想関数としてオーバーライドでき、逆もできる。一部のオーバーライドが`constexpr`で、一部がそうでない場合は、非`constexpr`な仮想関数の呼び出しのみ定数式にならない。


## 例
```cpp example
struct X {
  virtual int f() const = 0;
};

// 非constexprな純粋仮想関数を、constexpr仮想関数としてオーバーライド
struct Y : public X {
  constexpr int f() const override { return 1; }
};

int main()
{
  static constexpr Y y{};
  constexpr const X& x = y;

  static_assert(x.f() == 1);
}
```


## 関連項目
- [C++11 constexpr](/lang/cpp11/constexpr.md)


## 参照
- [P1064R0 Allowing Virtual Function Calls in Constant Expressions](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p1064r0.html)
