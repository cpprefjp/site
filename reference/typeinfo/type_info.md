# type_info
* typeinfo[meta header]
* std[meta namespace]
* class[meta id-type]

```cpp
namespace std {
  class type_info;
}
```

## 概要
`type_info`クラスは、`typeid`演算�によって返される、型の情報が格納された型である。

ユーザーは、この型を使用して、型名の検索や比較を行うことができる。`typeid`演算�に型を渡すと、その型の`type_info`オブジェクトが返され、`typeid`演算�にオブジェクトを渡すと、そのオブジェクトの型の`type_info`オブジェクトが返される。

`typeid`に、多相的な型のオブジェクトへの間接参照されたポインタに適用される場合、その型は実行時に決定する。これは、RTTI(実行時型情報)が利用可能であることを要求する。  
それ以外の場合、`typeid`の評価はコンパイル時に完了する。  

`typeid`演算�に、間接参照されたヌルポインタが渡された場合、[`bad_typeid`](/reference/typeinfo/bad_typeid.md)例外が投げられる。


## メンバ関数

| 名前 | 説明 | 対応バージョン |
|---------------------------------------------|-----------------------------|-------|
| [`(constructor)`](type_info/op_constructor.md) | コンストラクタ              | |
| [`(destructor)`](type_info/op_destructor.md) | デストラクタ                | |
| `operator=(const type_info&) = delete`      | 代入演算�                  | |
| [`before`](type_info/before.md)           | 2つの型の照合順序を比較する | |
| [`hash_code`](type_info/hash_code.md)     | 型のハッシュ値を取得する    | C++11 |
| [`name`](type_info/name.md)               | 実装定義の型名を取得する    | |
| [`operator==`](type_info/op_equal.md)     | 2つの型が同じかを判定する   | |
| [`operator!=`](type_info/op_not_equal.md) | 2つの型が異なるかを判定する | |


## 例
```cpp example
#include <iostream>
#include <typeinfo>

struct Base {};
struct Derived : public Base {};

struct PolyBase { virtual void member(){} };
struct PolyDerived : public PolyBase {};

int main() {
  // 組み込み型
  int i;
  int* pi;
  std::cout << "int is: " << typeid(int).name() << std::endl;
  std::cout << "  i is: " << typeid(i).name() << std::endl;
  std::cout << " pi is: " << typeid(pi).name() << std::endl;
  std::cout << "*pi is: " << typeid(*pi).name() << std::endl;
  std::cout << std::endl;

  // 非多相的な型
  Derived derived;
  Base* pbase = &derived;
  std::cout << "derived is: " << typeid(derived).name() << std::endl;
  std::cout << " *pbase is: " << typeid(*pbase).name() << std::endl;
  std::cout << std::boolalpha << "same type? "
            << (typeid(derived) == typeid(*pbase)) << std::endl;
  std::cout << std::endl;

  // 多相的な型
  PolyDerived polyderived;
  PolyBase* ppolybase = &polyderived;
  std::cout << "polyderived is: " << typeid(polyderived).name() << std::endl;
  std::cout << " *ppolybase is: " << typeid(*ppolybase).name() << std::endl;
  std::cout << std::boolalpha << "same type? "
            << (typeid(polyderived) == typeid(*ppolybase)) << std::endl;
}
```
* typeid[color ff0000]
* name()[link type_info/name.md]

### 出力例
```
int is: int
  i is: int
 pi is: int *
*pi is: int

derived is: struct Derived
 *pbase is: struct Base
same type? false

polyderived is: struct PolyDerived
 *ppolybase is: struct PolyDerived
same type? true
```

## 参照

