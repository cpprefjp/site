# operator==
* memory[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class T1, class T2>
  bool operator==(const allocator<T1>&,
                  const allocator<T2>&) throw();           // (1) C++03

  template <class T, class U>
  bool operator==(const allocator<T>&,
                  const allocator<U>&) noexcept;           // (1) C++11

  template <class T, class U>
  constexpr bool operator==(const allocator<T>&,
                            const allocator<U>&) noexcept; // (1) C++20
}
```

## 概要
2つの`allocator`オブジェクトを等値比較する。


## 戻り値
`true`


## 例
```cpp example
#include <iostream>
#include <memory>

int main()
{
  std::allocator<int> a;
  std::allocator<int> b;

  if (a == b) {
    std::cout << "equal" << std::endl;
  }
  else {
    std::cout << "not equal" << std::endl;
  }
}
```

### 出力例
```
equal
```


## 参照
- [P0784R7 More constexpr containers](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0784r7.html)
