#address
```cpp
// C++03
pointer address(reference x) const;
const_pointer address(const_reference x) const;

// C++11
pointer address(reference x) const noexcept;
const_pointer address(const_reference x) const noexcept;
```

##概要
変数のアドレスを取得する。


##戻り値
- C++03 : `&x`
- C++11 : `operator&`がオーバーロードされていたとしても、`x`が参照するオブジェクトのアドレスを返す。


##例
```cpp
#include <iostream>
#include <memory>
#include <utility>

int main()
{
  std::allocator<int> alloc;

  int x = 3;

  // 変数xのアドレスを取得する
  int* p = alloc.address(x);

  std::cout << std::hex << p << std::endl;
  std::cout << std::dec << x << std::endl;
}
```

###出力
```
0x7fff54064a7c
3
```


