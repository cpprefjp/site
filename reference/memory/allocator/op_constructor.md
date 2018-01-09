# コンストラクタ
* memory[meta header]
* std[meta namespace]
* allocator[meta class]
* function[meta id-type]

```cpp
allocator() throw();  // (1) C++03
allocator() noexcept; // (2) C++11

allocator(const allocator&) throw();  // (2) C++03
allocator(const allocator&) noexcept; // (2) C++11

template <class U>
allocator(const allocator<U>&) throw();  // (3) C++03

template <class U>
allocator(const allocator<U>&) noexcept; // (3) C++11
```

## 概要
`allocator`オブジェクトを構築する。


## 例外
投げない。


## 例
```cpp example
#include <memory>

int main()
{
  std::allocator<int> alloc;
}
```

### 出力
```
```


