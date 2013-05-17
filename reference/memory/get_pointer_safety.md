#get_pointer_safety
```cpp
namespace std {
  pointer_safety get_pointer_safety() noexcept;
}
```
* pointer_safety[link /reference/memory/pointer_safety.md]

##概要
ポインタの安全性が、使用している処理系においてどのように実装されているかを確認する。


##戻り値
[`pointer_safety`](/reference/memory/pointer_safety.md)型の列挙値のうち、いずれかが返却される。 
返される値は処理系依存。


##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation#clang.md):
- [GCC](/implementation#gcc.md):
- [ICC](/implementation#icc.md):
- [Visual C++](/implementation#visual_cpp.md):


