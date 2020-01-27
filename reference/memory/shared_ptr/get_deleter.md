# get_deleter
* memory[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class D, class T>
  D* get_deleter(const shared_ptr<T>& p) noexcept;
}
```

## 概要
`shared_ptr`オブジェクトが持つデリータを取得する。


## 戻り値
`p`が持っているデリータの型がDのcv修飾を外した型に�しい場合、そのデリータオブジェクトへのポインタを返す。
型が�しくなければヌルポインタを返す。


## 備考
この関数によって返されるポインタは、`p`と同じ寿命を持つ。

デリータオブジェクトの所有権は`p`が持っているため、この関数のユーザーがデリータオブジェクトを`delete`してはならない。


## 例外
投げない


## 例
```cpp example
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
* std::get_deleter[color ff0000]

### 出力
```
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0
- [GCC](/implementation.md#gcc): 4.3.6
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2008 (TR1), 2010, 2012, 2013

