#get_deleter (C++11)
```cpp
deleter_type& get_deleter() noexcept;
const deleter_type& get_deleter() const noexcept;
```

##概要
デリータを取得する。


##戻り値
保持しているデリータオブジェクトへの参照を返す。


##例
```cpp
#include <iostream>
#include <memory>

int main()
{
  std::unique_ptr<int> p(new int(3));

  // デリータを取得
  std::default_delete<int>& f = p.get_deleter();
}
```

###出力
```
```

##バージョン
###言語
- C++11

###処理系
- [GCC](/implementation#gcc.md): 4.4.7
- [Clang libc++, C++11 mode](/implementation#clang.md): 3.0
- [ICC](/implementation#icc.md): ?
- [Visual C++](/implementation#visual_cpp.md): 10.0, 11.0, 12.0
