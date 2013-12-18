#clear
```cpp
void clear() noexcept;
```

##概要
全ての要素を削除する。


##効果
[`erase`](./erase.md)`(`[`begin()`](./begin.md)`, `[`end()`](./end.md)`);`と同じ。


##戻り値
なし


##例外
投げない


##例
```cpp
#include <cassert>
#include <string>

int main()
{
  std::string s = "hello";

  // 文字列を空にする
  s.clear();

  assert(s.empty());
}
```

###出力
```
```

##参照
