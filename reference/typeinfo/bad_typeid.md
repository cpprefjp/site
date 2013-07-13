#bad_typeid
```cpp
namespace std {
  class bad_typeid : public exception;
}
```
* exception[link /reference/exception/exception.md]

##概要
`bad_typeid`クラスは、ヌルポインタを指すオブジェクトを間接参照して`typeid`演算子に渡された場合に送出される例外である。


###メンバ関数

| 名前 | 説明 | 対応バージョン |
|-------------------------------------------------------------------------|--------------------|---|
| `bad_typeid() noexcept;`<br/> `bad_typeid(const bad_typeid&) noexcept;` | コンストラクタ | |
| `virtual ~bad_typeid() = default;`                                      | デストラクタ | |
| `bad_typeid& operator=(const bad_typeid&) noexcept;`                    | 代入演算子 | |
| `virtual const char* what() const noexcept;`                            | 実装定義のエラー内容を取得する | |


###例
```cpp
#include <iostream>
#include <typeinfo>

struct Polymorphic { virtual void f() {} };

int main()
{
  try {
    Polymorphic* p = 0;

    // オブジェクトpは Polymorphic* 型
    std::cout << "1: " << typeid(p) << std::endl;

    // ヌルポインタを指すオブジェクトを間接参照してtypeid演算子に渡す...
    std::cout << "2: " << typeid(*p) << std::endl;
  }
  catch (std::bad_typeid& e) {
    std::cerr << e.what() << std::endl;
  }
}
```
* std::bad_typeid[color ff0000]

###出力例
```
1: Polymorphic*
std::bad_typeid
```

##参照

