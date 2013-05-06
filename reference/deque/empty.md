#empty
```cpp
bool empty() const noexcept;
```

##概要
コンテナが空かどうかを判定する


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

###出力
```
true
false
```

##参照
| | |
|-----------------------------------------------------------------------------------------------|--------------------------------|
| [`clear`](./clear.md) | 全ての要素を削除する |
| [`erase`](./erase.md) | 要素を削除する |
| [`size`](./size.md) | 要素数を取得する |


