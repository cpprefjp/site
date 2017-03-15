# operator=
* deque[meta header]
* std[meta namespace]
* deque[meta class]
* function[meta id-type]

```cpp
deque& operator=(const deque& x);           // (1) C++03
deque& operator=(deque&& y);                // (2) C++11
deque& operator=(initializer_list<T> init); // (3) C++11
```
* initializer_list[link /reference/initializer_list.md]

## 概要
- (1) : コピー代入
- (2) : ムーブ代入
- (3) : 初期化子リストの代入


## 効果
- (1) : 同じテンプレートパラメータを持つ`deque`クラスのオブジェクトをコピー代入する。`*this`の全ての要素が解放され、`x`の全ての要素が`*this`にコピーされる。
- (2) : 同じテンプレートパラメータを持つ`deque`クラスのオブジェクトをムーブ代入する。`*this`の全ての要素が解放され、`x`の全ての要素が`*this`にムーブされる。
- (3) : 同じ要素型を持つ[`initializer_list`](/reference/initializer_list.md)クラスのオブジェクトをコピー代入する。`*this`の全ての要素が解放され、`x`の全ての要素が`*this`にコピーされる。


## 戻り値
`*this`


## 計算量
- (1) : 全要素のデストラクタ呼び出しとコピーを行うために、線形時間
- (2) : 全要素のデストラクタ呼び出しをするために、線形時間
- (3) : 全要素のデストラクタ呼び出しとコピーを行うために、線形時間


## 例
```cpp
#include <iostream>
#include <deque>

template <class T>
void print(const char* name, const std::deque<T>& c)
{
  std::cout << name << " : {";
  for (const T& x : c) {
    std::cout << x << " ";
  }
  std::cout << "}" << std::endl;
}

int main ()
{
  std::deque<int> c = {1, 2, 3};

  // コピー代入
  std::deque<int> c1;
  c1 = c;

  // ムーブ代入
  std::deque<int> c2;
  c2 = std::move(c);

  // 初期化子リストの代入
  std::deque<int> c3;
  c3 = {1, 2, 3};

  print("c1", c1);
  print("c2", c2);
  print("c3", c3);
}
```
* std::move[link /reference/utility/move.md]

### 出力
```
c1 : {1 2 3 }
c2 : {1 2 3 }
c3 : {1 2 3 }
```

## 参照
- [N2679 Initializer Lists for Standard Containers(Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2679.pdf)
    - (3)の経緯となる提案文書


