# operator!=
* memory[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  // operator==により、以下のオーバーロードが使用可能になる (C++20)
  template <class T1, class T2>
  bool operator!=(const allocator<T1>&,
                  const allocator<T2>&) throw();           // (1) C++03

  template <class T, class U>
  bool operator!=(const allocator<T>&,
                  const allocator<U>&) noexcept;           // (1) C++11
}
```

## 概要
2つの`allocator`オブジェクトを非等値比較する。


## 戻り値
`false`


## 例
```cpp example
#include <iostream>
#include <memory>

int main()
{
  std::allocator<int> a;
  std::allocator<int> b;

  if (a != b) {
    std::cout << "not equal" << std::endl;
  }
  else {
    std::cout << "equal" << std::endl;
  }
}
```

### 出力例
```
equal
```


## 参照
- [P0784R7 More constexpr containers](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0784r7.html)
- [P1614R2 The Mothership has Landed](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1614r2.html)
    - C++20での三方比較演算子の追加と、関連する演算子の自動導出
