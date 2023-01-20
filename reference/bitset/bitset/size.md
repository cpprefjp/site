# size
* bitset[meta header]
* std[meta namespace]
* bitset[meta class]
* function[meta id-type]

```cpp
size_t size() const;                    // (1) C++03
constexpr size_t size() noexcept;       // (1) C++11
constexpr size_t size() const noexcept; // (1) C++14
```

## 概要
ビット数を取得する。


## 戻り値
テンプレートパラメータ`N`を返す。


## 例
```cpp example
#include <iostream>
#include <bitset>

int main()
{
  std::bitset<4> bs("1011");

  std::cout << bs.size() << std::endl;
}
```

### 出力
```
4
```


## 参照
- [N3669 Fixing constexpr member functions without const](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3669.pdf)
