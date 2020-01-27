# dynamic_pointer_cast
* memory[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class T, class U>
  shared_ptr<T> dynamic_pointer_cast(const shared_ptr<U>& r) noexcept; // (1) C++11

  template <class T, class U>
  shared_ptr<T> dynamic_pointer_cast(shared_ptr<U>&& r) noexcept;      // (2) C++20
}
```

## 概要
`shared_ptr` で管理するインスタンスに対して `dynamic_cast` を行う。


## 戻り値
- `r` が空であった場合、この関数は空の `shared_ptr<T>` を返却する。
- (1) :
    ```cpp
    return shared_ptr<T>(r, dynamic_cast<typename shared_ptr<T>::element_type*>(r.get()));
    ```
    * r.get()[link get.md]

- (2) :
    ```cpp
    return shared_ptr<T>(std::move(r), dynamic_cast<typename shared_ptr<T>::element_type*>(r.get()));
    ```
    * std::move[link /reference/utility/move.md]
    * r.get()[link get.md]


## 備考
- `shared_ptr<T>(dynamic_cast<T*>(r.get()))` という方法は動作未定義となるので使用しないこと。


## 例外
投げない


## 例
```cpp example
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

int main()
{
  std::shared_ptr<B> b(new B());
  std::shared_ptr<A> a = std::static_pointer_cast<A>(b);

  // AからBへのダウン�ャスト
  if (std::shared_ptr<B> result = std::dynamic_pointer_cast<B>(a)) {
    result->call();
  }
  else {
    std::cout << "conversion error" << std::endl;
  }
}
```
* std::dynamic_pointer_cast[color ff0000]
* std::static_pointer_cast[link static_pointer_cast.md]

### 出力
```
B::call()
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0
- [GCC](/implementation.md#gcc): 4.3.6
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2008 (TR1), 2010, 2012, 2013


## 参照
- [LWG Issue 2996. Missing rvalue overloads for `shared_ptr` operations](https://wg21.cmeerw.net/lwg/issue2996)
