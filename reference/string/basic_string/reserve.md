#reserve
* string[meta header]
* std[meta namespace]
* basic_string[meta class]

```cpp
void reserve(size_type res_arg = 0);
```

##概要
`basic_string` が最適にメモリを確保できるよう、あらかじめサイズ変更の予定を指示する。


##効果
[`capacity()`](./capacity.md)` >= res_arg` となる。


##戻り値
なし


##例外
`res_arg > `[`max_size()`](./max_size.md) の場合、[`length_error`](/reference/stdexcept.md) 例外を投げる。 
`allocator_traits<Allocator>::allocate()` が、よりふさわしい例外を投げるかもしれない。


##例
```cpp
#include <iostream>
#include <string>

int main()
{
  std::string s;
  s.reserve(3);

  // 確保したサイズを確認
  std::size_t cap = s.capacity();
  std::cout << cap << std::endl;

  // reserveしたサイズを越えない限り、
  // push_backのたびにメモリの再確保が起こらない
  s.push_back('a');
  s.push_back('b');
  s.push_back('c');
}
```

###出力例
```
3
```

##参照
