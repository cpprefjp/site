#get_deleter (C++11)
* memory[meta header]
* std[meta namespace]

```cpp
namespace std {
  template <class D, class T>
  D* get_deleter(const shared_ptr<T>& p) noexcept;
}
```

##概要
`shared_ptr`オブジェクトが持つデリータを取得する。


##戻り値
`p`が持っているデリータの型がDのcv修飾を外した型に等しい場合、そのデリータオブジェクトへのポインタを返す。
型が等しくなければヌルポインタを返す。


##備考
この関数によって返されるポインタは、`p`と同じ寿命を持つ。

デリータオブジェクトの所有権は`p`が持っているため、この関数のユーザーがデリータオブジェクトを`delete`してはならない。


##例外
投げない


##例
```cpp
#include <memory>

struct MyDeleter {
  template <class T>
  void operator()(T* p)
  {
    delete p;
  }
};

int main()
{
  std::shared_ptr<int> p(new int(3), MyDeleter());

  MyDeleter* deleter = std::get_deleter<MyDeleter>(p);
}
```

###出力
```
```

##バージョン
###言語
- C++11

###処理系
- [Clang, C++11 mode](/implementation.md#clang): 3.0
- [GCC, C++11 mode](/implementation.md#gcc): 4.3.6
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 9.0 (TR1), 10.0, 11.0, 12.0

