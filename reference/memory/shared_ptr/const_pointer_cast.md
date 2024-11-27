# const_pointer_cast
* memory[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class T, class U>
  shared_ptr<T> const_pointer_cast(const shared_ptr<U>& r) noexcept; // (1) C++11

  template <class T, class U>
  shared_ptr<T> const_pointer_cast(shared_ptr<U>&& r) noexcept;      // (2) C++20
}
```

## 概要
`shared_ptr` で管理するインスタンスに対して `const_cast` を行う。


## 戻り値
- `r` が空であった場合、この関数は空の `shared_ptr<T>` を返却する。
- (1) :
    ```cpp
    return shared_ptr<T>(r, const_cast<typename shared_ptr<T>::element_type*>(r.get()));
    ```
    * r.get()[link get.md]

- (2) :
    ```cpp
    return shared_ptr<T>(std::move(r), const_cast<typename shared_ptr<T>::element_type*>(r.get()));
    ```
    * std::move[link /reference/utility/move.md]
    * r.get()[link get.md]


## 備考
- `shared_ptr<T>(const_cast<T*>(r.get()))` という方法は未定義動作を引き起こすので使用しないこと。


## 例外
投げない


## 例
```cpp example
#include <memory>
#include <iostream>

int main()
{
  std::shared_ptr<const int> cp(new int(3));
  std::shared_ptr<int> p = std::const_pointer_cast<int>(cp);

  std::cout << *p << std::endl;
}
```
* std::const_pointer_cast[color ff0000]

### 出力
```
3
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0 [mark verified]
- [GCC](/implementation.md#gcc): 4.3.6 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2008 (TR1) [mark verified], 2010 [mark verified], 2012 [mark verified], 2013 [mark verified]


## 参照
- [LWG Issue 2996. Missing rvalue overloads for `shared_ptr` operations](https://wg21.cmeerw.net/lwg/issue2996)
