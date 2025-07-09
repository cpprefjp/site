# reinterpret_pointer_cast
* memory[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std {
  template <class T, class U>
  shared_ptr<T> reinterpret_pointer_cast(const shared_ptr<U>& r) noexcept; // (1) C++17

  template <class T, class U>
  shared_ptr<T> reinterpret_pointer_cast(shared_ptr<U>&& r) noexcept;      // (2) C++20
}
```

## 概要
`shared_ptr` で管理するインスタンスに対して `reinterpret_cast` を行う。


## 戻り値
- `r` が空であった場合、この関数は空の `shared_ptr<T>` を返却する。
- (1) :
    ```cpp
    return shared_ptr<T>(r, reinterpret_cast<typename shared_ptr<T>::element_type*>(r.get()));
    ```
    * r.get()[link get.md]

- (2) :
    ```cpp
    return shared_ptr<T>(std::move(r), reinterpret_cast<typename shared_ptr<T>::element_type*>(r.get()));
    ```
    * std::move[link /reference/utility/move.md]
    * r.get()[link get.md]


## 備考
- `shared_ptr<T>(reinterpret_cast<T*>(r.get()))` という方法は未定義動作を引き起こすので使用しないこと。


## 例外
投げない


## 例
```cpp example
#include <memory>
#include <cassert>
#include <cstdint>

int main()
{
  // 互換性のある配列間の変換を行う
  std::shared_ptr<std::int8_t[]> p(new std::int8_t[4]{1, 1, 1, 1});
  std::shared_ptr<std::int32_t[]> q = std::reinterpret_pointer_cast<std::int32_t[]>(p);

  std::int32_t r = q[0];

  std::int32_t x = (1 << 8) | (1 << 16) | (1 << 24) | 1;
  assert(r == x);
}
```
* std::reinterpret_pointer_cast[color ff0000]

### 出力
```
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc): 7.3 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [LWG Issue 2996. Missing rvalue overloads for `shared_ptr` operations](https://wg21.cmeerw.net/lwg/issue2996)
