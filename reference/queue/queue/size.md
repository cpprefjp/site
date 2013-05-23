#size
```cpp
size_type size() const;
```

##概要
`queue` に格納されている要素の個数を返す。 
内部のコンテナの `size()` メンバ関数を呼ぶ。


##効果
`return c.size();`


##戻り値
`queue` の内部のコンテナに含まれている要素の個数。
`size_type` は符号なし汎整数型。


##計算量
定数時間 O(1) が望ましい。


##例
```cpp
#include <iostream>
#include <queue>

int main() {
  std::queue<int> q;
  q.push(1);
  std::cout << q.size() << std::endl;
  q.push(2);
  std::cout << q.size() << std::endl;
  q.push(3);
  std::cout << q.size() << std::endl;
  return 0;
}
```

###出力
```
1
2
3
```

##参照


