#static_pointer_cast
```cpp
namespace std {  template<class T, class U>
    shared_ptr<T> static_pointer_cast(shared_ptr<U> const& r) noexcept;
}
```

shared_ptr で管理するインスタンスに対して static_cast を行いたい場合に使用する。

r が空であった場合、この関数は空の shared_ptr<T> を返却する。
それ以外の場合、この関数は static_cast<T*> を行い shared_ptr<T> を返却する。
この際、shared_ptr<U> の参照カウンタをそのまま使用する。(shared_ptr<U>.use_count() == shared_ptr<T>.use_count())

shared_ptr<T>(static_cast<T*>(r.get())) という方法は動作未定義となるので使用しないこと。

<b>コード例</b>
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

<b>実行例</b>
```cpp
B::call()
B::call()
```

ideone : [http://ideone.com/WRHrq](http://ideone.com/WRHrq)

<b>言語のバージョン</b>

C++11

<b>開発環境</b>

GCC 4.4 C++0x mode
Visual C++ 10.0
