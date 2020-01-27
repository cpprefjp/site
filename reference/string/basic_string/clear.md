# clear
* string[meta header]
* std[meta namespace]
* basic_string[meta class]
* function[meta id-type]

```cpp
void clear() noexcept;
```

## 概要
全ての要素を削除する。


## 効果
[`erase`](erase.md)`(`[`begin()`](begin.md)`,` [`end()`](end.md)`);`と同じ。


## 戻り値
なし


## 例外
投げない


## 例
```cpp example
#include <cassert>
#include <string>

int main()
{
  std::string s = "hello";

  // 文�列を空にする
  s.clear();

  assert(s.empty());
}
```
* clear()[color ff0000]
* s.empty()[link empty.md]

### 出力
```
```

## 参照
