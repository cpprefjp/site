#bad_typeid
```cpp
namespace std {
  class bad_typeid : public exception;
}
```
* exception[link /reference/exception/exception.md]

##概要
`bad_typeid`クラスは、ヌルポインタを指すオブジェクトを間接参照して`typeid`に渡された場合に送出される例外である。


###メンバ関数

| | |
|-------------------------------------------------------------------------|--------------------|
| `bad_typeid() noexcept;`<br/> `bad_typeid(const bad_typeid&) noexcept;` | コンストラクタ |
| `virtual ~bad_typeid() = default;`                                      | デストラクタ |
| `bad_typeid& operator=(const bad_typeid&) noexcept;`                    | 代入演算子 |
| `virtual const char* what() const noexcept;`                            | 実装定義のエラー内容を取得する |


###例
```cpp
#include <iostream>
#include <typeinfo>

struct Polymorphic { virtual void f() {} };

int main ()
{
  try {
    Polymorphic* p = 0;
    typeid(*p);
  }
  catch (std::bad_typeid& e) {
    std::cerr << e.what() << std::endl;
  }
}
```

###出力例
```
std::bad_typeid
```

##参照

