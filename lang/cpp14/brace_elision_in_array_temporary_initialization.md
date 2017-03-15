# 宣言時のメンバ初期化を持つ型の集成体初期化を許可
* cpp14[meta cpp]

## 概要
C++11では、集成体初期化とリスト初期化の両方を含む場合、二重に波カッコを書くことが必須となっていた。そのため、`public`メンバ変数として組み込み配列を持つ[`std::array`](/reference/array.md)クラスのオブジェクトを初期化する場合、以下のように、不要とも思える二重の波カッコを書かなければならなかった：

```cpp
std::array<int, 3> ar = {{ 1, 2, 3 }}; // OK : 
//std::array<int, 3> ar = { 1, 2, 3 }; // コンパイルエラー！本当はこう書きたい
```
* std::array[link /reference/array.md]

C++14ではこの制限が緩和され、内側の波カッコを省略できることになった：

```cpp
std::array<int, 3> ar1 = {{ 1, 2, 3 }}; // OK : これまで通り
std::array<int, 3> ar2 = { 1, 2, 3 };   // OK : 波カッコが一組でよくなった
```
* std::array[link /reference/array.md]


この変更は、多次元配列を初期化する際に通常以下のように書くものを：

```cpp
int x[2][2] = {{1, 2}, {3, 4}};
```

以下のように内側の波カッコを省略して書けるのと同じ規則を、集成体初期化とリスト初期化の組み合わせに対しても当てはめるものである：

```cpp
int x[2][2] = {1, 2, 3, 4};
```


## 参照
- [CWG Issue 1270. Brace elision in array temporary initialization](http://www.open-std.org/jtc1/sc22/wg21/docs/cwg_defects.html#1270)
- [vector/arrayとUniform initialization+Initializer list - yohhoyの日記](http://d.hatena.ne.jp/yohhoy/20120724/p1)
- [initializer-listによるaggregate初期化の制約緩和 - yohhoyの日記](http://d.hatena.ne.jp/yohhoy/20131116/p1)

