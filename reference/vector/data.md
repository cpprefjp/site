#data
```cpp
T* data() noexcept;
const T* data() const noexcept;
```

##効果
配列の先頭へのポインタを返す。


##戻り値
`[data(), data() + size())` が適正な範囲になるようなポインタ。

空ではない`vector`に対しては`data() == &front()`となる。

`vector` が空の場合は明記されていない。参考程度に、これを書いた時点では空の場合、libstdc++ では不正な操作になる実装となっており、libc++ では空でも問題無い実装となっている。

##計算量
定数時間


##例
```cpp
#include <iostream>
#include <vector>

int main()
{
  std::vector<int> v = {3, 1, 4};

  int* p = v.data();

  std::cout << *p << std::endl;

  ++p;
  std::cout << *p << std::endl;
}
```
* data[color ff0000]

###出力
```
3
1
```

##言語
- C++11

