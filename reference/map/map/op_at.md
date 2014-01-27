#operator[]
```cpp
T& operator[](const key_type& x);
T& operator[](key_type&& x);
```

##概要
指定したキーを持つ要素を取得する。対応する要素が存在しない場合は生成して返す。


##戻り値
キー`x`に対応する値を返す。対応する要素が存在しない場合は、要素をデフォルト構築して参照を返す。


##計算量
要素数に対して対数時間


##例
```cpp
#include <iostream>
#include <map>

int main()
{
  std::map<int, char> m;
  m.insert(std::make_pair(1, 'a'));

  // キー`1`に対応する要素を参照する
  char& a = m[1];
  std::cout << a << std::endl;

  // キー`2`に対応する要素を生成する
  m[2] = 'b';
}
```

###出力
```
a
```

##参照

| 名前 | 説明 |
|------------------------------------------------|-----------------------|
| [`operator=`](/reference/map/map/op_assign.md) | 代入演算子 |
| [`insert`](/reference/map/map/insert.md) | 要素を挿入する |


