# bad_typeid
* typeinfo[meta header]
* std[meta namespace]
* class[meta id-type]

```cpp
namespace std {
  class bad_typeid : public exception;
}
```
* exception[link /reference/exception/exception.md]

## 概要
`bad_typeid`クラスは、ヌルポインタを指すオブジェクトを間接参照して`typeid`演算子に渡された場合に送出される例外である。


## メンバ関数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [(constructor)](bad_typeid/op_constructor.md) | コンストラクタ | |
| [(destructor)](bad_typeid/op_destructor.md) | デストラクタ | |
| [`operator=`](bad_typeid/op_assign.md) | 代入演算子 | |
| [`what`](bad_typeid/what.md) | エラー理由を取得する | |


## 例
```cpp example
#include <iostream>
#include <typeinfo>

struct Polymorphic { virtual void f() {} };

int main()
{
  try {
    Polymorphic* p = 0;

    // オブジェクトpは Polymorphic* 型
    std::cout << "1: " << typeid(p).name() << std::endl;

    // ヌルポインタを指すオブジェクトを間接参照してtypeid演算子に渡す…
    std::cout << "2: " << typeid(*p).name() << std::endl;
  }
  catch (std::bad_typeid& e) {
    std::cerr << e.what() << std::endl;
  }
}
```
* std::bad_typeid[color ff0000]

### 出力例
```
1: Polymorphic*
std::bad_typeid
```

## 参照
