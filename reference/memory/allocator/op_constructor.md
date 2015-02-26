#コンストラクタ
* memory[meta header]
* std[meta namespace]

```cpp
// C++03
allocator() throw();
allocator(const allocator&) throw();
template <class U> allocator(const allocator<U>&) throw();

// C++11
allocator() noexcept;
allocator(const allocator&) noexcept;
template <class U> allocator(const allocator<U>&) noexcept;
```

##概要
`allocator`オブジェクトを構築する。


##例外
投げない。


##例
```cpp
#include <memory>

int main()
{
  std::allocator<int> alloc;
}
```

###出力
```
```


