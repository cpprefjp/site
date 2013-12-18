#empty
```cpp
bool empty() const noexcept;
```

##概要
文字列が空か判定する。


##戻り値
[`size()`](./size.md) `== 0` の評価結果。


##例外
投げない


##例
```cpp
#include <cassert>
#include <string>

int main()
{
  std::string s = "hello";
  assert(!s.empty());

  s.clear();
  assert(s.empty());

  s = "";
  assert(s.empty());
}
```

###出力
```
```

##参照
