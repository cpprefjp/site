#max_size
* memory[meta header]
* std[meta namespace]
* allocator[meta class]
* function[meta id-type]

```cpp
size_type max_size() const throw();  // C++03
size_type max_size() const noexcept; // C++11
```

##概要
一度に確保可能なメモリの最大サイズを取得する。


##戻り値
[`allocate`](allocate.md)`(N, 0)`が成功するであろう最大の`N`を返す。


##例
```cpp
#include <iostream>
#include <memory>

int main()
{
  std::allocator<int> alloc;

  std::cout << alloc.max_size() << std::endl;
}
```

###出力例
```
4611686018427387903
```


