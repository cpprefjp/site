#operator==
* memory[meta header]
* std[meta namespace]
* allocator[meta class]
* function[meta id-type]

```cpp
// C++03
template <class T1, class T2>
bool operator==(const allocator<T1>&, const allocator<T2>&) throw();

// C++11
template <class T, class U>
bool operator==(const allocator<T>&, const allocator<U>&) noexcept;
```

##概要
2つの`allocator`オブジェクトを等値比較する。


##戻り値
`true`


##例
```cpp
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

###出力例
```
equal
```


