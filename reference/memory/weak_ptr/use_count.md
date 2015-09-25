#use_count
* memory[meta header]
* std[meta namespace]
* weak_ptr[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
long use_count() const noexcept;
```

##概要
監視している[`shared_ptr`](/reference/memory/shared_ptr.md)オブジェクトの所有者数を取得する。


##戻り値
`*this`が[`shared_ptr`](/reference/memory/shared_ptr.md)オブジェクトを監視していない空の状態なら、`0`を返す。

そうでなければ、[`shared_ptr`](/reference/memory/shared_ptr.md)オブジェクトの所有者数([`shared_ptr`](/reference/memory/shared_ptr.md)`::`[`use_count()`](/reference/memory/shared_ptr/use_count.md))を返す。


##例
```cpp
#include <iostream>
#include <memory>

int main()
{
  std::weak_ptr<int> wp;
  {
    std::shared_ptr<int> sp(new int(3));

    // shared_ptrオブジェクトspを監視する
    wp = sp;

    std::cout << wp.use_count() << std::endl;
  }

  std::cout << wp.use_count() << std::endl;
}
```

###出力
```
1
0
```

##バージョン
###言語
- C++11

###処理系
- [GCC, C++11 mode](/implementation.md#gcc): 4.3.6
- [Clang libc++, C++11 mode](/implementation.md#clang): 3.0
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): ?
