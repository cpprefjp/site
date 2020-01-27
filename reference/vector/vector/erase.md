# erase
* vector[meta header]
* std[meta namespace]
* vector[meta class]
* function[meta id-type]

```cpp
iterator erase(iterator position);       // (1) C++03
iterator erase(const_iterator position); // (1) C++11

iterator erase(iterator first, iterator last);             // (2) C++03
iterator erase(const_iterator first, const_iterator last); // (2) C++11
```

## 概要
指定した要素を削除する。


## 要件
- `T`はMoveAssignableでなければならない。


## 効果
- (1) : `position`が指す要素が削除される。
- (2) : `[first, last)`で示される範囲の要素が削除される。

削除された要素またはそれ以降の要素を指すイテレータや参照は無効になる。


## 戻り値
削除された要素の次の要素を指すイテレータを返す。そのような要素が�在しない場合は、[`end()`](end.md)を返す。さらに、削除された要素以降の要素の数と同じ回数の`T`のムーブ代入演算�が呼ばれる。


## 計算量
削除される要素の数と同じ回数の`T`のデストラクタが実行される。


## 備考
コピーコンストラクタ、ムーブコンストラクタ、代入演算�、ムーブ代入演算�が例外を投げる場合を除いて、この関数は例外を投げない。

## 例
### 基本的な使い方 (C++11)
```cpp example
#include <iostream>
#include <vector>

void print(const char* name, const std::vector<int>& v)
{
  std::cout << name << " : {";

  bool first = true;
  for (int x : v) {
    if (first) {
      first = false;
    }
    else {
      std::cout << ", ";
    }

    std::cout << x;
  }
  std::cout << "}" << std::endl;
}

int main()
{
  // (1)
  {
    std::vector<int> v = {1, 2, 3, 4, 5};

    // 2番目の単一要素(値3)を削除
    v.erase(v.begin() + 2);
    print("(1)", v);
  }

  // (2)
  {
    std::vector<int> v = {1, 2, 3, 4, 5};

    // 範囲[v.begin(), v.begin() + 2)の要素を削除
    v.erase(v.begin(), v.begin() + 2);
    print("(2)", v);
  }
}
```
* erase[color ff0000]

#### 出力
```
(1) : {1, 2, 4, 5}
(2) : {3, 4, 5}
```


### イテレート�に要素を削除する (C++11)
```cpp example
#include <iostream>
#include <vector>

int main()
{
  std::vector<int> v = {3, 1, 4};

  // イテレート�に要素削除をするような場合には、
  // 範囲for文は使用できない
  for (auto it = v.begin(); it != v.end();) {
    // 条件一致した要素を削除する
    if (*it == 1) {
      // 削除された要素の次を指すイテレータが返される。
      it = v.erase(it);
    }
    // 要素削除をしない場合に、イテレータを進める
    else {
      ++it;
    }
  }

  for (const auto& x : v) {
    std::cout << x << std::endl;
  }
}
```

#### 出力
```
3
4
```


## 関連項目
- [`erase()` (非メンバ関数)](erase_free.md)
- [`erase_if()` (非メンバ関数)](erase_if_free.md)


## 参照
- [N2350 Container insert/erase and iterator constness (Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2350.pdf)

