# ビットフィールドのメンバ変数初期化
* cpp20[meta cpp]

## 概要
C++11で導入された[非静的メンバ変数の初期化子](/lang/cpp11/non_static_data_member_initializers.md)では、ビットフィールドは対象外であった。

C++20では、ビットフィールドのメンバ変数も、定義時に初期化ができるようになる。

```cpp
struct X {
  int x : 6 = 8; // 6ビットを持つビットフィールドメンバ変数xを、値8で初期化
  int y : 2 {1};  // 2ビットを持つビットフィールドメンバ変数yを、値1で初期化
};
```

ただし以下のような状況では、最長マッチによって意図通りに動作しない場合がある：

```cpp
int bits;
struct X {
  int a : true ? 8 : bits = 2; // int a : (true ? 8 : bits = 2)
  int b : 1 || new int { 0 };  // int b : (1 || new int {0})
};
```

こういった場合には、丸カッコで囲まなければならない：

```cpp
int bits;
struct X {
  int a : (true ? 8 : bits) = 2;
  int b : (1 || new int) { 0 };
};
```


## 仕様
- ビットフィールド初期化の構文は以下のようになる：

    ```
    型 変数名(省略可) 属性(省略可) : 定数式のビット幅(省略可) 波カッコもしくは代入構文による初期化子(省略可)
    ```

- ビットフィールドの初期値は、非ビットフィールドのメンバ変数初期化と同様にデフォルト値である。コンストラクタで明示的にビットフィールドを初期化した場合、デフォルト値ではなく指定された初期値で初期化される


## 例
```cpp example
#include <iostream>

struct X {
  int a : 6 = 8;
  int b : 2 {1};
};

int main()
{
  X x;
  std::cout << x.a << std::endl;
  std::cout << x.b << std::endl;
}
```

### 出力
```
8
1
```


## 関連項目
- [C++11 非静的メンバ変数の初期化](/lang/cpp11/non_static_data_member_initializers.md)


## 参照
- [P0187R0 Proposal of Bitfield Default Member Initializers](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0187r0.pdf)
- [R0187R1 Proposal/Wording for Bit-field Default Member Initializer Syntax](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0187r1.pdf)
- [P0683R1 Default member initializers for bit-fields](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0683r1.html)

