#empty
```cpp
bool empty() const noexcept;
```

##概要

<b>コンテナが空かどうかを判定する</b>


##戻り値

コンテナが空であれば`true`、そうでなければ`false`を返す。


##例外

投げない


##計算量

定数時間


##例

```cpp
#include <iostream>
#include <deque>

int main()
{
  // 空
  {
    std::deque<int> c;
    bool b = c.empty();
    std::cout << std::boolalpha << b << std::endl;
  }
  // 空じゃない
  {
    std::deque<int> c = {1, 2, 3};
    bool b = c.empty();
    std::cout << std::boolalpha << b << std::endl;
  }
}
```
* empty[color ff0000]
* empty[color ff0000]

###出力

```cpp
true
false
```

##参照


| | |
|-----------------------------------------------------------------------------------------------|--------------------------------|
| [`clear`](/reference/deque/clear.md) | 全ての要素を削除する |
| [`erase`](/reference/deque/erase.md) | 要素を削除する |
| [`size`](/reference/deque/size.md) | 要素数を取得する |


