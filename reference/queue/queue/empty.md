#empty
```cpp
bool empty() const;
```

##概要

<b>queue が空か否か、つまり要素数が 0 か否かを返す。</b>
<b>内部のコンテナの empty() メンバ関数を呼ぶ。</b>


##効果
`return c.empty()`

##戻り値

要素数が 0 の場合は true、それ以外の場合は false。


##計算量

定数時間 O(1)。


##備考



##例

```cpp
#include <iostream>
#include <queue>

int main() {
  std::queue<int> q;
  if( q.empty() ) {
    std::cout << "empty" << std::endl;
  }
  else {
    std::cout << "not empty" << std::endl;
  }
  return 0;
}
```

###出力

```cpp
empty
```

##参照


