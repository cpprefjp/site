#static_pointer_cast
```cpp
namespace std {
  template<class T, class U>
  shared_ptr<T> static_pointer_cast(shared_ptr<U> const& r) noexcept;
}
```

##概要
`shared_ptr` で管理するインスタンスに対して `static_cast` を行う。 


##戻り値
`r` が空であった場合、この関数は空の `shared_ptr<T>` を返却する。 
空ではない場合、この関数は `static_cast<T*>` を行い `shared_ptr<T>` を返却する。 
この際、`shared_ptr<U>` の参照カウンタをそのまま使用する。(`shared_ptr<U>.use_count() == shared_ptr<T>.use_count()`)

##備考
`shared_ptr<T>(static_cast<T*>(r.get()))` という方法は動作未定義となるので使用しないこと。


##例
```cpp
#include <memory>
#include <iostream>
 
struct A {
  virtual void call() const {
    std::cout << "A::call" << std::endl;
  }
};
 
struct B : A {
  void call() const {
    std::cout << "B::call()" << std::endl;
  }
};
 
int main() {
  auto sp1 = std::make_shared<B>();
  sp1->call();
 
  auto sp2 = std::static_pointer_cast<A>(sp1);
  if(sp1 == sp2) {
    sp2->call();
  }
}
```

##出力
```
B::call()
B::call()
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.4
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md): 10.0

