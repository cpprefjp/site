#assign
```cpp
template <class InputIterator>void assign(InputIterator first, InputIterator last);void assign(size_type n, const T& u);void assign(initializer_list<T>);
```

##要件

a.assign(first, last)形式の場合、Tは*firstからXに対してEmplaceConstructibleでなければならない。イテレーターがForward iterators の要件を満たさない場合、TはXに対してMoveInsertableでなければならない。[first, last)の範囲のそれぞれのイテレーターは１回だけdereferenceされる。first, lastはaのイテレーターであってはならない。a.assign(n, u) 形式の場合、uはaの要素への参照であってはならない。


##効果

a.assign(first, last)形式の場合、[first, last)の範囲の要素のコピーでaの要素を置き換える。a.assign(n, u) 形式の場合、aの要素をすべてn個のuのコピーに置き換える。a.assign(il) 形式の場合の効果は、a.assign(il.begin(), il.end())と同じである。


##戻り値

なし


##計算量



##備考



##例

```cpp
// This can be compiled with GCC, C++0x mode 4.6.0#include <array>#include <vector>#include <iostream>using namespace std;int main(){  cout << "Constructor with initializer-list example:" << endl;  vector<int> a = {1, 2, 3, 4};  for (int i : a)    cout << i << endl;  cout << endl;  cout << "a.assign(first, last) example:" << endl;  const array<int, 4> data = {4, 3, 2, 1};  a.assign(data.begin(), data.end());  for (int i : a)    cout << i << endl;  cout << endl;  cout << "a.assign(il) example:" << endl;  a.assign({2,4,6,8});  for (int i : a)    cout << i << endl;  cout << endl;  return 0;}
```

###出力

```cpp
Constructor with initializer-list example:1234a.assign(first, last) example:4321a.assign(il) example:2468
```
