#nullptr_t型の定数式を非型テンプレートパラメータとすることを許可
* cpp14[meta cpp]

##概要
[`nullptr_t`](/reference/cstddef/nullptr_t.md)型の定数式を非型テンプレートパラメータとすることが許可された。


##例
```cpp
#include <cstddef>

template <std::nullptr_t P>
struct X {};

int main()
{
  X<nullptr>();
}
```
* std::nullptr_t[link /reference/cstddef/nullptr_t.md]

###出力
```
```


##関連項目
- [C++11 `nullptr`](/lang/cpp11/nullptr.md)


##参照
- [CWG Issue 1398. Non-type template parameters of type `std::nullptr_t`](http://www.open-std.org/jtc1/sc22/wg21/docs/cwg_defects.html#1398)

